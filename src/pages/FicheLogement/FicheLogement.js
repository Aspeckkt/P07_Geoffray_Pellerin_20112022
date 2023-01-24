import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom"; // ont peut également utiliser les Hook useHistory pour les version antèrieur à la 6
import Carrousel from "../../components/Carrousel/Carrousel";
import Collapse from "../../components/Collapse/Collapse";
import Host from "../../components/Host/Host";
import Rate from "../../components/Rate/Rate";
import Tag from "../../components/Tag/Tag";

export default function FicheLogement() {
	const params = useParams();

	const [pickedAppart, setPickedAppart] = useState();

	let { id } = useParams();

		useEffect(() => {
		fetch('/logements.json')
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				const appart = data.find((appart) => appart.id === id);
				if (appart) {
					setPickedAppart(appart);

				} else {
					navigate('/404');
				}
			})
		// eslint-disable-next-line
	}, []);
	
	const slidePics = pickedAppart && pickedAppart.pictures;
	const tags = pickedAppart && pickedAppart.tags;
	const equipments = pickedAppart && pickedAppart.equipments;
	const equip =
		pickedAppart &&
		equipments.map((item, index) => (
			<li key={index} className="equipList">
				{item}
			</li>
		));
	return (
		pickedAppart && (
			<div key={params.id} className="fiche-container">
				<Carrousel slides={slidePics} />
				<section className="hostInfo-container">
					<div className="title-tags-container">
						<div className="title-container redFont">
							<h1>{pickedAppart.title}</h1>
							<h3>{pickedAppart.location}</h3>
						</div>
						<div className="tags-container">
							{tags.map((tag) => (
								<Tag key={tag} tag={tag} />
							))}
						</div>
					</div>
					<div className="rate-host-container">
						<div className="host-container redFont">
							<Host
								hostName={pickedAppart.host.name}
								hostPic={pickedAppart.host.picture}
							/>
						</div>
						<div className="rate-container">
							<Rate score={pickedAppart.rating} />
						</div>
					</div>
				</section>
				<div className="collapse-fiche-container">
					<Collapse
						aboutTitle="Description"
						aboutText={pickedAppart.description}
					/>
					<Collapse aboutTitle="Équipements" aboutText={equip} />
				</div>
			</div>
		)
	);
}
