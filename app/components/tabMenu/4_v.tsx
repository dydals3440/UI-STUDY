import cx from './cx';
import data from '../tooltip/data';
import VanillaWrapper from '../vanillaWrapper';

const buildTabMenus = ({ id, title }: { id: string; title: string }) => {
	const $li = document.createElement('li');
	$li.classList.add(cx('tab'));
	$li.textContent = title;
	$li.setAttribute('data-id', id);
	return $li;
};

const buildDescriptions = ({
	id,
	description,
}: {
	id: string;
	description: string;
}) => {
	const $div = document.createElement('div');
	$div.classList.add(cx('description'));
	$div.textContent = description;
	return $div;
};

const initiator = (wrapper: HTMLDivElement) => {
	let currentId: string = data[0].id;

	const $container = document.createElement('div');
	$container.classList.add(cx('container'), cx('tabMenu2'));

	const $tabUl = document.createElement('ul');
	$tabUl.classList.add(cx('tabList'));

	const $tabList = data.map(buildTabMenus);

	const $desc = data.map(buildDescriptions);

	$tabUl.append(...$tabList);
	$container.append($tabUl, ...$desc);

	const handleClickTab = (e: Event) => {
		const $el = e.target as HTMLElement;
		// tab인 경우만 클릭하고, 아닌 경우는 early return
		if (!$el.classList.contains(cx('tab'))) return;
		// parentElement까지 갈 필요 없음.
		const targetId = $el.dataset.id;
		if (!targetId) return;

		currentId = $el.dataset.id || data[0].id;
		$tabList.forEach(($item, i) => {
			$item.classList.toggle(cx('current'), currentId === $item.dataset.id);
			$desc[i].classList.toggle(cx('current'), currentId === $item.dataset.id);
		});
	};
	$tabUl.addEventListener('click', handleClickTab);
	$tabList[3].click();

	wrapper.append($container);
};

const TabMenu4V = () => <VanillaWrapper title='#4' initiator={initiator} />;

export default TabMenu4V;
