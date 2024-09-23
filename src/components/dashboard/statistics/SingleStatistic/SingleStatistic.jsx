import './styles.sass'

import { Image } from 'antd';

export const SingleStatisticView = (props) => {
  return (
    <div className='single-statistic'>
      <div className='single-statistic__icon'>
        <Image width={40} height={40} src={ props.icon } />
      </div>
      <div className='single-statistic__label'> { props.title } </div>
      <div className='single-statistic__value'> { props.value } </div>
    </div>
  )
}
