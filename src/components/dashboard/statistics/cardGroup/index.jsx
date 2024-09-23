import './styles.scss'
import { CardGroupView } from './cardGroup'

const CardGroupContainer = (props) => {
	return (
		<CardGroupView { ...props } />
	)
}

export const CardGroup = CardGroupContainer