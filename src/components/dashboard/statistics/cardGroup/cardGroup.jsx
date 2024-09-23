import { Typography, Image } from 'antd';

export const CardGroupView = (props) => {
	return (
		<div className="card-group">
			<div className='card-group__cards'>
				{
					props.items?.map((item, index) => (
            <div key={index} className='card-group__card'>
              <div>
                <Image width={40} height={40} src={ item.icon } />
              </div>
              <div>
                <Typography.Text>{ item.title }</Typography.Text>
              </div>
              <div>
                <Typography.Title>{ item.value }</Typography.Title>
              </div>
            </div>
					))
				}
			</div>
		</div>
	)
}
