'use client';

import { ROUTE_PATH, isParentRoute, routes } from '../routes';

const ItemPage = ({ params: { item } }: { params: { item: string[] } }) => {
	const path = ['', ...item].join('/') as ROUTE_PATH;
	// children 배열로 잡히는걸 여기서 만들어 놓고 감으로 인해 타입을 컴포넌트로만 남김.
	const route = routes[path];
	if (!route?.children || isParentRoute(route)) return null;
	const { children: Component } = route;

	return <Component />;
};

export default ItemPage;
