import { useEffect, useState } from "react";
import { client } from "../../../tina/__generated__/client";

type ServiceLink = {
	id: string;
	title: string;
};

type RawService = {
	_sys?: {
		filename?: string | null;
	} | null;
	title?: string | null;
};

const toServiceId = (service: RawService) => {
	if (service._sys?.filename) {
		return service._sys.filename;
	}

	return (service.title || "tjeneste")
		.toLowerCase()
		.replace(/æ/g, "ae")
		.replace(/ø/g, "o")
		.replace(/å/g, "a")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
};

export const useServiceLinks = () => {
	const [serviceLinks, setServiceLinks] = useState<ServiceLink[]>([]);

	useEffect(() => {
		const loadServices = async () => {
			try {
				const response = await client.queries.servicesConnection({
					sort: "order",
				});

				const services = (response?.data?.servicesConnection?.edges || [])
					.map((edge: any) => edge?.node as RawService | null | undefined)
					.filter((service): service is RawService => Boolean(service))
					.map((service) => ({
						id: toServiceId(service),
						title: service.title || "Tjeneste",
					}));

				if (services.length > 0) {
					setServiceLinks(services);
				}
			} catch (error) {
				console.error("Failed to load services for navigation", error);
			}
		};

		loadServices();
	}, []);

	return serviceLinks;
};
