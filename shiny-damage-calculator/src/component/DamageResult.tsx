import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { calcMemorialDamage, calcNormalDamage } from '../simulator';
import { AppealTarget } from '../state';
import { idolWord, isPC, range } from '../utility';
import { AppContext } from './App';

const perfectLabel = () => isPC() ? 'PERFECT' : 'P';
const goodLabel = () => isPC() ? 'GOOD' : 'G';
const normalLabel = () => isPC() ? 'NORMAL' : 'N';

const DamageResult: React.FC = () => {
	const context = React.useContext(AppContext);

	const onChange = (event: React.FormEvent<any>) => {
		if (event.currentTarget.value !== undefined) {
			context.dispatch({'type': 'CARD', 'value': event.currentTarget.value});
		}
	};

	const typeIndex = () =>
	{
		switch(context.state.appealTarget) {
		    case 'vo':
		    	return 0;
				break;
			case 'da':
		    	return 1;
				break;
			case 'vi':
		    	return 2;
				break;
		}
		return 0;
	};

	const memorialDamageGood = calcMemorialDamage(context.state, true);
	const memorialDamageBad = calcMemorialDamage(context.state, false);
	const normalDamage = range(5).map(index => {
		return ['vo', 'da', 'vi'].map(type => {
			const type2 = type as AppealTarget;
			return [
				calcNormalDamage(context.state, index, type2, 'perfect'),
				calcNormalDamage(context.state, index, type2, 'good'),
				calcNormalDamage(context.state, index, type2, 'normal')
			]
		});
	});

	return (<div className='p-3'>
		<div className='d-flex'>
			<strong className='text-nowrap mt-2'>어필스킬</strong>
			<FormControl className='m-1' as='select' defaultValue={'' + context.state.cardMultiple} onChange={onChange}>
			{
				range(41).map(i => {
					const val = i + 10;
					const text = `${val / 10}배`
					return (<option key={i} value={'' + val}>{text}</option>);
				})
			}
			</FormControl>
		</div>
		<table className='table table-responsive text-center table-sm'>
			<thead>
				<tr>
					<th scope='col' rowSpan={2}>{isPC() ? 'ID' : 'ID'}</th>
					<th scope='col' colSpan={2}>{}</th>
				</tr>
				<tr>
					<th scope='col'>{perfectLabel()}</th>
					<th scope='col'>{goodLabel()}</th>
					<th scope='col'>{normalLabel()}</th>
				</tr>
			</thead>
			<tbody>
			{
				
				range(5).map(index => {
					let idolName = '';
					if (index === 0) {
						idolName = context.state.pIdolName !== '' ? context.state.pIdolName : `p${idolWord()}`;
					} else {
						idolName = context.state.sIdolName[index - 1] !== '' ? context.state.sIdolName[index - 1] : `s${index}${idolWord()}`;
					}
					return (<tr key={index}>
						<th scope='row' className='text-nowrap'>{idolName}</th>
						<td>{normalDamage[index][typeIndex()][0]}</td>
						<td>{normalDamage[index][typeIndex()][1]}</td>
						<td>{normalDamage[index][typeIndex()][2]}</td>
					</tr>)
				})
			}
			</tbody>
		</table>
		<strong>오모이데</strong><br />
		<table className='table table-responsive text-center table-sm'>
			<thead>
				<tr>
					<th scope='col'>판정</th>
					<th scope='col'>Vo</th>
					<th scope='col'>Da</th>
					<th scope='col'>Vi</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Good</td>
					<td>{memorialDamageGood[0]}</td>
					<td>{memorialDamageGood[1]}</td>
					<td>{memorialDamageGood[2]}</td>
				</tr>
				<tr>
					<td>Bad</td>
					<td>{memorialDamageBad[0]}</td>
					<td>{memorialDamageBad[1]}</td>
					<td>{memorialDamageBad[2]}</td>
				</tr>
			</tbody>
		</table>
	</div>);
}

export default DamageResult;
