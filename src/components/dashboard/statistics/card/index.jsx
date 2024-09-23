import './styles.scss'
import { CardView } from './card'

const CardContainer = (props) => {
	return (
		<CardView { ...props } />
	)
}

export const Card = CardContainer