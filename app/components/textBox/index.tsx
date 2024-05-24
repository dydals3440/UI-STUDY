import cx from '../textBox/cx';
import TextBox1 from './1_r';

const TextBox = () => {
	return (
		<div className={cx('TextBoxes')} style={{ marginBottom: 500 }}>
			<h2>텍스트 박스</h2>
			<TextBox1 />
		</div>
	);
};

export default TextBox;
