import Accordions from './components/accordion';

const routePaths = ['/', '/accordion'] as const;

export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
	key: ROUTE_PATH;
	link: ROUTE_PATH;
	name: string;
};

export type ParentRoute = BaseRoute & {
	children: ROUTE_PATH[];
};

export type ChildRoute = BaseRoute & {
	children: ((props: unknown) => JSX.Element) | null;
};

export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
	'/': {
		key: '/',
		link: '/',
		name: 'root',
		children: ['/accordion'],
	},
	'/accordion': {
		key: '/accordion',
		link: '/accordion',
		name: '01. 아코디언',
		children: Accordions,
	},
};

// parentRoutes는 children이 ROUTE_PATH인 배열이고
// ChildRoute는  jsx를 해주는 react elements거나, null
// 배열이면 parentRoute
export const isParentRoute = (route: ROUTE): route is ParentRoute =>
	Array.isArray(route.children);

export const gnbRootList = (routes['/'] as ParentRoute).children.map(
	(r) => routes[r]
);
