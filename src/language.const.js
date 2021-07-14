export const LANGUAGE = {
	common: {
		error: {
			kor: '에러',
		},
		search: {
			kor: '조회',
		},
		numberPlate: {
			kor: '차번호',
		},
		canNotFindData: {
			kor: '조회 데이터가 없습니다.',
		},
		week: {
			kor: '일주일',
		},
		aMonth: {
			kor: '1개월',
		},
		threeMonth: {
			kor: '3개월',
		},
		sixMonth: {
			kor: '6개월',
		},
		aYear: {
			kor: '1년',
		},
		setting: {
			kor: '설정',
		},
	},
	menu: {
		alert: {
			currentPassword: {
				kor: '현재 비밀번호를 입력해주세요.',
			},
			newPassword: {
				kor: '새로운 비밀번호를 입력해주세요.',
			},
			unvalidPassword: {
				kor: '비밀번호 확인이 일치하지 않습니다.',
			},
		},
		navBar: {
			realTimeStatus: {
				kor: '주차장 현황',
			},
			realTimeList: {
				kor: '실시간 주차 목록',
			},
			searchIncome: {
				kor: '수입 조회',
			},
			getAllData: {
				kor: '전체 주차 데이터',
			},
		},
		modal: {
			id: {
				kor: '아이디',
			},
			currentPassword: {
				kor: '현재 비밀번호',
			},
			newPassword: {
				kor: '새 비밀번호',
			},
			confirmPassword: {
				kor: '비밀번호 확인',
			},
			confirm: {
				kor: '변경',
			},
		},
	},
	axios: {
		alert: {
			noCarPlate: {
				kor: '차 번호가 존재하지 않습니다.',
			},
		},
	},
	user: {
		payment: {
			alert: {
				confirm: {
					kor: '결제가 완려되었습니다.',
				},
			},
		},
		main: {
			getParkingLotStatus: {
				kor: '주차장 혼잡도 확인하기',
			},
			inputPlaceholder: {
				kor: '전체 차번호 또는 뒤4자리를 입력하세요',
			},
		},
		location: {
			myCarsLocationIs: {
				kor: '내 차 위치는',
			},
			and: {
				kor: '이며',
			},
			paymentIs: {
				kor: '요금은',
			},
			langString: {
				kor: '입니다.',
			},
			reSearch: {
				kor: '다시 검색하기',
			},
			payment: {
				kor: '결제하기',
			},
		},
		error: {
			canNotFindLocation: {
				kor: '위치를 조회 할 수 없습니다.',
			},
			contactToAdmin: {
				kor: '지속 조회 불가 시 관리자 문의 바랍니다.',
			},
		},
		congestion: {
			now: {
				kor: '현재',
			},
			countOfCanParking: {
				kor: '대 주차가능',
			},
			area: {
				kor: '구역',
			},
			full: {
				kor: '만차',
			},
		},
	},
	admin: {
		AllParkingData: {
			toDay: {
				kor: '오늘',
			},
			week: {
				kor: '1주일',
			},
			aMonth: {
				kor: '1개월',
			},
			threeMonth: {
				kor: '3개월',
			},
			sixMonth: {
				kor: '6개월',
			},
			inputCarPlate: {
				kor: '차번호를 입력하세요',
			},
			date: {
				kor: '날짜',
			},
			numberPlate: {
				kor: '차번호',
			},
			inputCar: {
				kor: '입차',
			},
			outputCar: {
				kor: '출차',
			},
			fee: {
				kor: '요금',
			},
			canNotFindData: {
				kor: '조회 데이터가 없습니다.',
			},
		},
		AdminCurrentParkingList: {
			inputCarPlate: {
				kor: '차번호를 입력하세요',
			},
			sortByNew: {
				kor: '최근 입차순',
			},
			sortByOld: {
				kor: '오래된 입차순',
			},
			area: {
				kor: '구역',
			},
			inputTime: {
				kor: '입차시간',
			},
			currentFee: {
				kor: '현재요금',
			},
		},
		AdminIncome: {
			period: {
				kor: '기간',
			},
			totalFee: {
				kor: '총 수입',
			},
			currentFeeIs: {
				kor: (fee) => `현재 요금은 시간당${fee}원 이며,`,
			},
			changeTo: {
				kor: '원으로 변경합니다.',
			},
		},
		login: {
			alert: {
				idAndPassword: {
					kor: '아이디와 비밀번호를 입력해주세요',
				},
			},
			placeholder: {
				email: {
					kor: '이메일을 입력하세요',
				},
				password: {
					kor: '비밀번호를 입력하세요',
				},
			},
		},
		main: {
			status: {
				kor: (data) =>
					`현재 ${data[0]}대 주차중 ${data[1]}대 평균 대기시간 4분 오늘 매출: ${data[2]}원`,
			},
			input: {
				kor: () => (
					<>
						입<br />차
					</>
				),
			},
			output: {
				kor: () => (
					<>
						출<br />차
					</>
				),
			},
		},
	},
};
