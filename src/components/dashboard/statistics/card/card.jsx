import { Tag, Table, Button, Col, Row, Typography, Image } from 'antd';
import { Card as AntCard } from 'antd';

export const CardView = (props) => {
	return (
		<AntCard 
			className='card'
			style={{ width: '300px' }} 
			hoverable={!!props.onClick} 
			onClick={props.onClick} 
		>
			<Col gutter={16}>
				<Col>
					<Image width={40} height={40} src={ props.icon } />
				</Col>
				<Col style={{ marginTop: '24px' }} >
					<Typography.Text>{ props.title }</Typography.Text>
				</Col>
				<Col style={{ marginTop: '8px' }}>
					<Typography.Title strong level={2}>{ props.value }</Typography.Title>
				</Col>
			</Col>
		</AntCard>
	)
}