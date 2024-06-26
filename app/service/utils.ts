export const measureLines = (elem: HTMLElement, val: string) => {
	if (!elem || !val) return 0;
	const canvas = document.createElement('canvas');
	const canvasContext = canvas.getContext('2d')!;
	// element넘겨주는 이유는, 스타일을 가져오기 위함, 캔버스에 넘겨서, 그 스타일이 반영된 상태에서 줄이 얼마나 넘치는지, 언제 넘치는지를 알기 위해서 Context를 사용.
	const style = window.getComputedStyle(elem);
	canvasContext.font = `${style.getPropertyValue(
		'font-size'
	)} ${style.getPropertyValue('font-family')}`;

	const measuredLines = val.split('\n').reduce((r, c) => {
		// reduce가 쓰는것은 value가 줄바꿈이 실제로 있는 것은, 기본으로 가져감.
		// 각 줄 바꿈을 제거한 나머지, 한줄마다 캔버스 컨텍스를 이용해서, 텍스트의 길이를 측정.

		// canvasContext는 폰트사이즈와, 폰트페밀리를 반영해서, 내가 입력한 텍스트를 갖고, 길이나 높이 측정 가능.
		// 올림 처리 하면 총 줄 수 나옴. 혹시나 0이 될 수 있으니 math.max로 1줄은 무조건 나오게 설정
		return (
			r +
			Math.max(
				Math.ceil(
					canvasContext.measureText(c).width / // 한 줄로 쭉 나열했을 떄의 길이(px)
						elem!.offsetWidth
				),
				1
			)
		);
	}, 0);
	// 이거를 기존 값에다가 더해서 리턴을 해주면, 초기 값을 0으로 잡아주면  줄바꿈을 제거한 하나의 줄에 대해서 텍스트 열을 넘쳤을 떄 몇 줄이 되는지를 계산하고, 그 줄들을 계속 다 더해 나가면, 전체 텍스트가 몇줄에 해당하는지를 알게 됨
	return measuredLines;
};

// 200글자 -> 180px
// textarea 90px => 2줄
