import './menu.css';

// 라우트
import { Link } from 'react-router-dom';
import { Route } from '../../config/routes';
import { useRef, useState } from 'react';

import useModal from '../modal/useModal';

import { adminLogout, getAdminInfo, resetAdminPwd } from '../../api/admin';
import { LANGUAGE } from '../../language.const';

const Menu = ({ setTitle }) => {
	const lang = localStorage.getItem('lang');
	const [openModal, closeModal, Modal] = useModal();
	// 로그아웃
	const logout = () => {
		// sessionStorage 에 user_id 로 저장되어 있는 아이템 삭제

		adminLogout();
		// 로그인 화면으로 이동
		document.location.href = '/admin';
	};

	//// 관리자 설정 ////

	const [adminId, setAdminId] = useState(-1);

	const handleSetAdmin = () => {
		// 빈칸이 있을 경우
		if (currentPW.current.value === '') {
			alert(LANGUAGE.menu.alert.currentPassword[lang]);
			return;
		}
		if (newPW.current.value === '' || newPWConfirm.current.value === '') {
			alert(LANGUAGE.menu.alert.newPassword[lang]);
			return;
		}

		// 새로운 비밀번호와 비밀번호 확인이 일치하는지 확인
		if (newPW.current.value !== newPWConfirm.current.value) {
			alert(LANGUAGE.menu.alert.unvalidPassword[lang]);
			return;
		}

		// 현재 비번이 일치하는지 확인
		getAdminInfo(setAdminId);

		console.log(currentPW.current.value);
		console.log(newPW.current.value);

		resetAdminPwd(adminId, currentPW.current.value, newPW.current.value);

		// 모달 닫기
		closeModal();
	};

	// const userID = useRef();
	const currentPW = useRef(); // 현재 PW
	const newPW = useRef(); // 새로운 PW
	const newPWConfirm = useRef(); // 새로운 PW 확인

	return (
		<>
			<div id='menu_bar'>
				<div id='admin_logo' />
				<div id='menus'>
					<Link to={Route.admin.main}>
						<div className='menu' title='주차장 현황'>
							{LANGUAGE.menu.navBar.realTimeStatus[lang]}
						</div>
					</Link>
					<Link to={Route.admin.currentParkingList}>
						<div className='menu' title='실시간 주차 목록'>
							{LANGUAGE.menu.navBar.realTimeList[lang]}
						</div>
					</Link>
					<Link to={Route.admin.Income}>
						<div className='menu' title='수입 조회'>
							{LANGUAGE.menu.navBar.searchIncome[lang]}
						</div>
					</Link>
					<Link to={Route.admin.allParkingData}>
						<div className='menu' title='전체 주차 데이터'>
							{LANGUAGE.menu.navBar.getAllData[lang]}
						</div>
					</Link>
				</div>
				<div id='admin_set_btn' onClick={openModal}>
					Setting
				</div>
				<div id='logout' onClick={logout}>
					<a>Logout</a>
				</div>
			</div>

			<Modal>
				<div id='admin_setting'>
					<div id='admin_setting_table'>
						<table>
							<tr>
								<td className='admin_setting_label admin_setting_td'>
									{LANGUAGE.menu.modal.id[lang]}
								</td>
								<td className='admin_setting_td'>{localStorage.getItem('login_id')}</td>
							</tr>
							<tr className='now_pw'>
								<td className='admin_setting_label admin_setting_td'>
									{LANGUAGE.menu.modal.currentPassword[lang]}
								</td>
								<td className='admin_setting_td td_pw'>
									<input className='td_pw_input' ref={currentPW} type='password' placeholder='' />
								</td>
							</tr>
							<tr className='margin_tr'></tr>
							<tr>
								<td className='admin_setting_label admin_setting_td'>
									{LANGUAGE.menu.modal.newPassword[lang]}
								</td>
								<td className='admin_setting_td td_pw'>
									<input className='td_pw_input' ref={newPW} type='password' placeholder='' />
								</td>
							</tr>
							<tr>
								<td className='admin_setting_label admin_setting_td'>
									{LANGUAGE.menu.modal.confirmPassword[lang]}
								</td>
								<td className='admin_setting_td td_pw'>
									<input
										className='td_pw_input'
										ref={newPWConfirm}
										type='password'
										placeholder=''
									/>
								</td>
							</tr>
						</table>
					</div>
					<button id='admin_setting_btn' onClick={handleSetAdmin}>
						{LANGUAGE.menu.modal.confirm[lang]}
					</button>
				</div>
			</Modal>
		</>
	);
};

export default Menu;
