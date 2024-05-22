import TabMenu1 from '../tabMenu/1_r';
import TabMenu2 from '../tabMenu/2_r';
import TabMenu3 from '../tabMenu/3_r';
import TabMenu4V from '../tabMenu/4_v';
import cx from '../tabMenu/cx';

const TabMenus = () => {
	return (
		<div className={cx('TabMenus')}>
			<h2>탭메뉴</h2>
			<TabMenu1 />
			<TabMenu2 />
			<TabMenu3 />
			<TabMenu4V />
		</div>
	);
};

export default TabMenus;
