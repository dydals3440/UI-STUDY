// css 모듈 쓸 떄 필요한 cf 모듈을 쓰기 위해 bind가 필요
// bind는 name을 scss에 있는 이름들에다가, 뒤에 hash를 붙여줘서 다른 거랑 영향을 안 미치게 함.
import classNames from 'classnames/bind';
import style from './index.module.scss';

const cx = classNames.bind(style);

export default cx;
