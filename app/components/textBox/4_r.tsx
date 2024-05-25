import { measureLines } from '../../service/utils';
import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';

const initiator = (wrapper: HTMLDivElement) => {
	const $text = document.createElement('textarea');
	$text.classList.add(cx('textarea'));
	$text.rows = 3;

	const handleInput = () => {
		const val = $text.value;
		const lines = Math.min(Math.max(measureLines($text, val), 3), 15);
		$text.rows = lines;
	};

	$text.addEventListener('input', handleInput);

	const $container = document.createElement('div');
	$container.classList.add(cx('container'));
	$container.append($text);

	wrapper.append($container);
};

const TextBox4V = () => <VanillaWrapper title='#4' initiator={initiator} />;

export default TextBox4V;
