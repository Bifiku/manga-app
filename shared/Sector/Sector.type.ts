import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { StyleProps } from 'react-native-reanimated';

export interface SectorType extends ViewProps {
	style?: StyleProps;
	title?: string;
	seeMore?: boolean;
	update?: boolean;
	updateFunc?: () => void;
}
