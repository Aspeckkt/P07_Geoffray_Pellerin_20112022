import { useEffect, useState } from "react";

// Composants //
import Banner from "../../components/Banner/Banner";
import Card from "../../components/Cards/Card";

// Mapping //
import { Link } from "react-router-dom";

export default function Home() {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch("/logements.json")
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setData(data)
			})
	}, [])

	return (
		<>
			<Banner />
			<div className="cards-container">
				{data.map((appart, id) => (
					<div className="card_logement" key={id}>
						<Link className="link_card_logement" to={`/logement/${appart.id}`}>
							<Card cover={appart.cover} title={appart.title} />
						</Link>
					</div>
				))}
			</div>
		</>
	);
}
