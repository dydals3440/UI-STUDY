import Accordions from './components/accordion';
import TextBox from './components/textBox';
import ToolTips from './components/tooltip';
import TabMenus from './components/tooltip';

const routePaths = [
	'/',
	'/accordion',
	'/tabMenu',
	'/tooltip',
	'/textBox',
] as const;

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
		children: ['/accordion', '/tabMenu', '/tooltip', '/textBox'],
	},
	'/accordion': {
		key: '/accordion',
		link: '/accordion',
		name: '01. 아코디언',
		children: Accordions,
	},
	'/tabMenu': {
		key: '/tabMenu',
		link: '/tabMenu',
		name: '02. 탭메뉴',
		children: TabMenus,
	},
	'/tooltip': {
		key: '/tooltip',
		link: '/tooltip',
		name: '03. 툴팁',
		children: ToolTips,
	},
	'/textBox': {
		key: '/textBox',
		link: '/textBox',
		name: '04. 텍스트 박스',
		children: TextBox,
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
