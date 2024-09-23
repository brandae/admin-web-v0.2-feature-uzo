import './dashboardStyles.sass'

import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Col } from 'antd';
import { Row } from 'antd';
import { Card } from 'antd';
import { Table } from 'antd';
import { Button } from 'antd';
import { Typography } from 'antd';

import OrderChart from 'views/dashboard/orderChart';
import SalesChart from 'views/dashboard/salesChart';
import TopProducts from 'views/dashboard/topProducts';
import TopCustomers from 'views/dashboard/topCustomers';

import { Todo } from 'components/todo';
import { SingleStatistic } from 'components/dashboard/statistics/SingleStatistic'
import { GroupedStatistics } from 'components/dashboard/statistics/GroupedStatistics'

import { setMenu } from 'redux/slices/menu';

import walletService from 'services/wallet';
import sellerWalletService from 'services/seller/wallet';

import shopService from 'services/shop';
import sellerShopService from 'services/seller/shop';

import refundService from 'services/refund';
import sellerRefundService from 'services/seller/refund';

const getRefundDetails = async (role) => {
  const service = role === "admin" ? refundService : sellerRefundService
	const requests = [
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10, status: 'pending' })
			.then( data => {
				return data?.meta?.total || 0
			}),
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10, status: 'accepted' })
			.then( data => {
				return data?.meta?.total || 0
			}),
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10, status: 'canceled' })
			.then( data => {
				return data?.meta?.total || 0
			}),
	]

	return await Promise.all(requests)
}

const getShopDetails = async (role) => {
  const service = role === "admin" ? shopService : sellerShopService
	const requests = [
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10 })
			.then( data => {
				return data?.meta?.total || 0
			}),
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10, status: 'pending' })
			.then( data => {
				return data?.meta?.total || 0
			})
	]

	return await Promise.all(requests)
}

const getPayoutDetails = async (role) => {
  const service = role === "admin" ? walletService : sellerWalletService
	const requests = [
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10, type: 'withdraw', status: 'processed' })
			.then( data => {
				return data?.meta?.total || 0
			}),
		service
			.getAll({ lang: 'en', pageSize: 10, perPage: 10, type: 'withdraw', status: 'pending' })
			.then( data => {
				return data?.meta?.total || 0
			})
	]

	return await Promise.all(requests)
}



export default function GeneralDashboard() {
  const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth, shallowEqual);
	const { theme } = useSelector((state) => state.theme, shallowEqual);

	const parcelMode = useMemo( () => !!theme.parcelMode && user?.role === 'admin', [theme, user]);
  const { counts } = useSelector( (state) => state.statisticsCount, shallowEqual);

  const [shopDetails, setShopDetails] = useState(null)
	const [payoutDetails, setPayoutDetails] = useState(null)
	const [refundDetails, setRefundDetails] = useState(null)

	const refreshRefundDetails = async () => {
		if(!refundDetails) {
			const details = await getRefundDetails(user?.role)
			setRefundDetails({
				pending: details[0],
				accepted: details[1],
				cancelled: details[2],
			})
		}
	}

	const refreshShopDetails = async () => {
		if(!shopDetails) {
			const details = await getShopDetails(user?.role)
			if(details) {
				setShopDetails({
					total: details[0],
					pending: details[1],
				})
			}
		}
	}

	const refreshPayoutDetails = async () => {
		if(!payoutDetails) {
			const details = await getPayoutDetails(user?.role)
			if(details) {
				setPayoutDetails({
					total: details[0],
					pending: details[1],
				})
			}
		}
	}

  const goToOrder = (url, name) => {
    const params =
      url === 'report/stock'
        ? {
            id: url,
            url,
            name,
            refetch: true,
            data: { value: 'out_of_stock', label: 'Out of stock' },
          }
        : { id: url, url, name, refetch: true };
    dispatch(setMenu(params));
    navigate(`/${url}`);
  };


	useEffect(() => { 
		refreshRefundDetails()
    {
      user?.role === "admin" &&
      refreshShopDetails()
    } 
		refreshPayoutDetails()
	}, [])


  return !parcelMode ? (
    <div className='dashboard'>
      <section className='dashboard__stats1'>
        <GroupedStatistics 
          title={"Orders"}
          subTitle={`${counts?.progress_orders_count + counts?.cancel_orders_count + counts?.delivered_orders_count} Total Orders`}
          subStatFormat="count"
          viewAll={() => {
            goToOrder(user?.role === 'seller' ? 'seller/orders' : 'orders', t('in.progress.orders'))
          }}
          subStats={[
            {
              label: 'In Progress',
              value: counts?.progress_orders_count,
            },
            {
              label: 'Cancelled',
              value: counts?.cancel_orders_count
            },
            {
              label: 'Delivered',
              value: counts?.delivered_orders_count
            },
          ]}
        />
        <GroupedStatistics 
          title={"Products"}
          subTitle={`${counts?.products_count} Total Products`}
          subStatFormat="count"
          viewAll={() => {
            goToOrder(user?.role === 'seller' ? 'seller/catalog/products' : 'catalog/products', 'Products')
          }}
          subStats={[
            {
              label: 'Out of Stock',
              value: counts?.products_out_of_count
            },
            {
              label: 'In Stock',
              value: (counts?.products_count - counts?.products_out_of_count)
            },
          ]}
        />
        {
          user?.role === "admin" &&
          <GroupedStatistics 
            title={"Earnings"}
            subTitle={`$${(counts?.total_earned || 0).toFixed(2)} Total Earnings`}
            subStatFormat="count"
            viewAll={() => {
              goToOrder(user?.role === 'seller' ? 'seller/report/revenue' : 'report/revenue', 'revenue')
            }}
            subStats={[
              {
                label: 'Delivery',
                value: !!counts?.delivery_earned ? counts?.delivery_earned : 0
              },
              {
                label: 'Tax',
                value: !!counts?.tax_earned ? counts?.tax_earned : 0
              },
              {
                label: 'Commission',
                value: !!counts?.commission_earned ? counts?.commission_earned : 0
              },
            ]}
          />
        }
      </section>

      <section className='dashboard__section'>
        <Todo />
      </section>

      <section className='dashboard__section dashboard__stats2'>
        <SingleStatistic
          title="Pending Refunds" 
          icon="/img/dashboard-sand-clock.svg"
          value={refundDetails?.pending}
        />
        <SingleStatistic
          title="New Delivery Signup" 
          icon="/img/dashboard-check.svg"
          value={counts?.progress_orders_count}
        />
        <SingleStatistic
          title="Pending Delivery Approval" 
          icon="/img/dashboard-sand-clock.svg"
          value={counts?.cancel_orders_count}
        />
        <SingleStatistic
          title="New Payout Request" 
          icon="/img/dashboard-check.svg"
          value={payoutDetails?.total}
        />
        <SingleStatistic
          title="Pending Payout Request" 
          icon="/img/dashboard-sand-clock.svg"
          value={payoutDetails?.pending}
        />
      </section>

      <section className='dashboard__section dashboard__stats3'>
        <div className='dashboard__stats3_section'>
          <OrderChart />
        </div>
        <div className='dashboard__stats3_section'>
          <SalesChart />
        </div>
      </section>

      <section className='dashboard__section'>
        <ChartTab counts={counts} />
      </section>

      <section className='dashboard__section'>
        <TableCard counts={counts} />
      </section>
    </div>
  ) : null
}



function ChartTab(props) {
	const [selectedTab, setSelectedTab] = useState('top-customers')

	return (
		<Card style={{ width: "100%" }}>
			<Col gutter={16}>
				<Row style={{ gap: '16px' }}>
					<Button type={selectedTab === "top-customers" && "primary"} onClick={() => setSelectedTab("top-customers")}>Top Customers</Button>
					<Button type={selectedTab === "top-products" && "primary"} onClick={() => setSelectedTab("top-products")}>Top Products</Button>
				</Row>
				<Row style={{ marginTop: '20px' }}>
					{ selectedTab == "top-customers" && <TopCustomers />}
					{ selectedTab == "top-products" && <TopProducts />}
				</Row>
			</Col>
		</Card>
	)
}


function TableCard(props) {
	return (
		<Card style={{ width: "100%" }}>
			<Col>
				<Typography.Title level={2}>Top Selling Products</Typography.Title>
			</Col>
			<Col>
				<Table dataSource={props.data} columns={props.columns} />;
			</Col>
		</Card>
	)
}
