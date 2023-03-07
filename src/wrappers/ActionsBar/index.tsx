import { ExportActions } from '../../components/ExportActions';
import FieldsSettings from '../../components/FieldsSettings';
import { ExcludableUserFields } from '../../components/FieldsSettings/content';
import { Filters, FilterType } from '../../components/Filters';

interface IActionsBarProps {
	onFilter: (filter: FilterType) => void;
	onFieldsChange?: (fields?: ExcludableUserFields[]) => void;
}

export const ActionsBar = ({ onFieldsChange, onFilter }: IActionsBarProps): JSX.Element => {
	const rootClassName = 'actions-bar';

	return (
		<div className={rootClassName}>
			<Filters onFilter={(filter: FilterType) => onFilter(filter)}/>
			<div className={`${rootClassName}__right-content`}>
				<ExportActions />
				{ onFieldsChange && <FieldsSettings onFieldsChange={(fields?: ExcludableUserFields[]) => onFieldsChange(fields) }/> }
			</div>
		</div>
	);
};
