import React, { useEffect, useState, useRef } from 'react';
import { getAdminParkingListSearch, getFee } from '../../../api/admin';
import { isBefore } from 'validator';
import './admin_currentPList.css';

import useModal from '../../../template/modal/useModal';
import { LANGUAGE } from '../../../language.const';

const LeftTHstyle = {
	borderTopLeftRadius: '10px',
	borderBottomLeftRadius: '10px',
};

const RightTHstyle = {
	borderTopRightRadius: '10px',
	borderBottomRightRadius: '10px',
};

const lang = localStorage.getItem('lang');

const CurrentPList = () => {
	// 시간당 요금

	const refFee = useRef();
	const [fee, setFee] = useState(1000); // 현재요금

	const refNumberPlate = useRef();

	// 현재요금 구하는 함수
	const getNowFee = (entryTime, fee) => {
		var entryTime = new Date(entryTime);
		var nowTime = new Date();
		var Interval = nowTime - entryTime;
		var elapsedHours = Math.floor(Interval / (1000 * 60 * 60) + 1); // 올림
		var userFee = elapsedHours * fee;

		userFee = userFee.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

		return userFee;
	};

	// 주차 데이터를 배열로 가져옴
	const [current, setCurrent] = useState([]);

	var feeValue = 0;
	useEffect(() => {
		// getAdminParkingList(setCurrent);
		getFee(setFee);
		// feeValue = fee;
		console.log('요금 : ' + fee);
		getAdminParkingListSearch(setCurrent, refNumberPlate.current.value);
	}, []);

	useEffect(() => {
		// getAdminParkingList(setCurrent);
		getAdminParkingListSearch(setCurrent, refNumberPlate.current.value);
	}, [fee]);

	// 검색한 차번호에 대한 데이터만 가져옴
	const handleGetDataOfNumberPlate = () => {
		getAdminParkingListSearch(setCurrent, refNumberPlate.current.value);
	};

	// sorting
	const sortCurrentData = (e) => {
		const json = current;

		console.log('refSort : ' + refSort.current.value);
		console.log(Array.isArray(json));

		refSort.current.value === 'area_ascend'
			? json.sort(function (a, b) {
					// 입차시각 오래된순
					// console.log(isBefore("2019-09-09 05:44:23", "2019-09-09 05:44:26"))
					return isBefore(a.car_entry_time, b.car_entry_time) ? 1 : -1;
			  })
			: json.sort(function (a, b) {
					// 입차시각 최근순
					return !isBefore(a.car_entry_time, b.car_entry_time) ? 1 : -1;
			  });

		console.log(json);
		setCurrent([...json]);
	};

	const refSort = useRef();

	return (
		<>
			<div>
				<div className='current_form'>
					<div className='current_search'>
						<input
							ref={refNumberPlate}
							type='text'
							className='current_searchbox'
							placeholder={LANGUAGE.admin.AdminCurrentParkingList.inputCarPlate[lang]}
						/>
						<input
							type='button'
							onClick={handleGetDataOfNumberPlate}
							className='current_search_btn'
							value='　'
						/>
					</div>
					<div className='sort'>
						<select ref={refSort} onChange={sortCurrentData} className='current_select' name='sort'>
							<option value='area_descend' selected='selected'>
								{LANGUAGE.admin.AdminCurrentParkingList.sortByNew[lang]}
							</option>
							<option value='area_ascend'>
								{LANGUAGE.admin.AdminCurrentParkingList.sortByOld[lang]}
							</option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<table className='current_table'>
					<tr>
						<th style={LeftTHstyle}>{LANGUAGE.admin.AdminCurrentParkingList.area[lang]}</th>
						<th>{LANGUAGE.common.numberPlate[lang]}</th>
						<th>{LANGUAGE.admin.AdminCurrentParkingList.inputTime[lang]}</th>
						<th>{LANGUAGE.admin.AdminCurrentParkingList.currentFee[lang]}</th>
						<th style={RightTHstyle}>　</th>
					</tr>
					{/* 주차 목록 */}
					{current.length > 0 ? ( // 최근입차순 or 마지막입차순 ? 마지막 입차순이면 reverse
						current.reverse().map((car) => (
							<tr>
								<td>{car.car_parking_id}</td>
								<td>{car.car_number_plate}</td>
								<td>{car.car_entry_time}</td>
								<td>{getNowFee(car.car_entry_time, fee)}</td>
								{/* <td>
									<input type='hidden' name='car_id' value={car.car_id} />
									<input className='modify' type='submit' value='수정' />
								</td> */}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5}>{LANGUAGE.common.canNotFindData[lang]}</td>
						</tr>
					)}
				</table>
			</div>
			{/* <useModal>
				<div className='modifyNumberPlate'>
					'현재차번호' ▶ &nbsp;&nbsp;
					<input type='text'/>
					 &nbsp;&nbsp;&nbsp;
					<br />
					<button>완료</button>
				</div>
			</useModal> */}
		</>
	);
};

export default CurrentPList;
