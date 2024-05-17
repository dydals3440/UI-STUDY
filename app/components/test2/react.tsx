import { useState } from 'react';

const Test2_React = () => {
	const [show, toggle] = useState(false);
	return (
		<div>
			테스트2 - 리액트
			<button onClick={() => toggle((p) => !p)}>토글</button>
			{show ? '켜짐' : '꺼짐'}
		</div>
	);
};

export default Test2_React;
