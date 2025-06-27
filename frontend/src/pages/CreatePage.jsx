import {useToast} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Create from "../components/create";
import {useProfileStore} from "../store/product";

const CreatePage = () => {
	const {createProduct} = useProfileStore();
	const navigate = useNavigate();
	const toast = useToast();
	const [load, setLoad] = useState(false);

	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

	const nameref = useRef(null);
	const priceref = useRef(null);
	const imageref = useRef(null);

	const handleAddProduct = async () => {
		setLoad(true);

		// return;
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			setLoad(false);
			toast({
				status: "error",
				title: "Please fill in all fields",
			});
			return;
		}

		const {success, message, res} = await createProduct(newProduct);

		if (!success && res && res === 401) {
			toast({status: "error", description: message});
			setLoad(false);
			return;
		}

		toast({
			status: success ? "success" : "error",
			description: message,
			isClosable: false,
			duration: 2500,
			position: "top",
		});

		if (success) {
			setLoad(false);
			setNewProduct({name: "", price: "", image: ""});
			navigate(`../`);
		}
	};

	function handleref() {
		if (!newProduct.name && !newProduct.price && !newProduct.image) {
			nameref.current.focus();
		} else if (newProduct.name) {
			priceref.current.focus();
		} else if (newProduct.price) {
			imageref.current.focus();
		} else {
			imageref.current.focus();
		}
	}

	return (
		<Create
			handleAddProduct={handleAddProduct}
			setNewProduct={setNewProduct}
			handleref={handleref}
			newProduct={newProduct}
			nameref={nameref}
			priceref={priceref}
			imageref={imageref}
			load={load}
		/>
	);
};

export default CreatePage;
