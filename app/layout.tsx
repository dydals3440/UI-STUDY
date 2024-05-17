import { Metadata } from 'next';
import React from 'react';
import './global.scss';
import Gnb from './gnb';

export const metadata: Metadata = {
	title: 'UI요소모음 | FE매튜',
	description: 'Vanilla / React로 UI요소 만들기',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='ko'>
			<body>
				<Gnb />
				<main>{children}</main>
			</body>
		</html>
	);
};

export default Layout;
