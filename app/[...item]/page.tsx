const ItemPage = ({ params: { item } }: { params: { item: string[] } }) => {
	const path = ['', ...item].join('/');
	console.log(path);
	return <div>Item Page {path}</div>;
};

export default ItemPage;
