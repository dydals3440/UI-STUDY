import cx from '../textBox/cx';
import TextBox1 from './1_r';
import TextBox2 from './2_r';
import TextBox3 from './3_r';

const TextBox = () => {
	return (
		<div className={cx('TextBoxes')} style={{ marginBottom: 500 }}>
			<h2>텍스트 박스</h2>
			<TextBox1 />
			<TextBox2 />
			<TextBox3 />
		</div>
	);
};

export default TextBox;
