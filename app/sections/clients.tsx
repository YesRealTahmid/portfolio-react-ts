import logos from "@/public/data/clientsData.json";
import Image from "next/image";
const Clients = () => {
    return (
        <section className="clients">
            <h3 className="h3 article-title clients-title">Technology Use</h3>
            <ul className="clients-list has-scrollbar">
                {logos.map((logo, index) => (
                    <li className="clients-item" key={index}>
                        <a href="#">
                            <Image src={logo.image} width="164" height="164" alt={`${logo.name} logo`} />
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Clients