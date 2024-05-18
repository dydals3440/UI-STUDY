import { useState } from 'react';
import cx from './cx';
import data from './data';
import VanillaWrapper from '../vanillaWrapper';

const itemBuilder = ({
	id,
	title,
	description,
}: {
	id: string;
	title: string;
	description: string;
}) => {
	const $li = document.createElement('li');
	$li.classList.add(cx('item'), cx('item3'));
	// <li data-id='id'></li>
	$li.setAttribute(`data-id`, id);
	// 물론 아래와 같이 해도됨.
	// $li.id = id

	const $tab = document.createElement('div');
	$tab.classList.add(cx('tab'));
	$tab.textContent = title;

	const $description = document.createElement('div');
	$description.classList.add(cx('description'));
	$description.textContent = description;

	$li.append($tab, $description);

	return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
	let currentId: string | null = null;
	// $는 jQuery에서 많이 사용, 이제는 HTML DOM을 표시하는 목적으로 많이 사용.
	const $ul = document.createElement('ul');
	$ul.classList.add(cx('container'));

	const handleClickTab = (e: Event) => {
		const $el = e.target as HTMLElement;
		if (!$el.classList.contains(cx('tab'))) return;
		// ul에만 걸었어도 불구하고, 타겟은 currentTarget과 달라서, 클릭한 대상 그 하위에만 있기만 하면 어디를 클릭해도 다클리됨 클릭ㅅ, 탭에 해당하면 우리가 원하는 동작을 구현 가능.

		const targetId = $el.parentElement!.dataset.id;
		if (!targetId) return;

		currentId = targetId === currentId ? null : targetId;

		$items.forEach(($item) => {
			// 앞에있는 클래스를 넣어주거나 빼줘라 (뒤에있는게 있으면 없애주고, 없으면 넣어줌)
			$item.classList.toggle(cx('current'), currentId === $item.dataset.id);
		});
	};
	$ul.addEventListener('click', handleClickTab);

	// data.map(d => itemBuilder(d)) === data.map(itemBuilder)
	const $items = data.map(itemBuilder);
	console.log('$items', $items);

	$ul.append(...$items);

	wrapper.append($ul);
	($items[0].children[0] as HTMLElement).click();
};

const Accordion4V = () => <VanillaWrapper title='#4' initiator={initiator} />;
export default Accordion4V;
