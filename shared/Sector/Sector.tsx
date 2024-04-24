import { View, StyleSheet } from 'react-native';
import { SectorType } from './Sector.type';
import { DIMENSIONS } from '../theme';
import { SectorTitle } from '../Titles/SectorTitle';
export const Sector = ({
	children,
	title,
	seeMore = false,
	style,
	update = false,
	updateFunc,
}: SectorType) => {
	return (
		<View style={{ ...styles.default, ...style }}>
			{title && (
				<SectorTitle title={title} seeMore={seeMore} update={update} updateFunc={updateFunc} />
			)}

			<View>{children}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	default: {
		gap: 10,
		paddingHorizontal: DIMENSIONS.padding,
	},
});
