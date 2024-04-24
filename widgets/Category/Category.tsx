import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import CategoryButton from '../../shared/ui/CategoryButton/CategoryButton';
import { DIMENSIONS } from '../../shared/theme';
import {
	cancelled,
	completed,
	createdAt,
	erotica,
	hiatus,
	ongoing,
	pornographic,
	rating,
	relevance,
	safe,
	suggestive,
	updatedAt,
} from '../../app/store/slices/categorySlice.slice';
import { useState } from 'react';

const Category = ({ style }: { style?: ViewStyle }) => {
	const orderArray = [relevance, createdAt, updatedAt, rating];
	const ratingArray = [safe, suggestive, erotica, pornographic];
	const statusArray = [ongoing, completed, hiatus, cancelled];
	const [resetTitle, setResetTitle] = useState(false);

	const resetTitleHandler = () => {
		setResetTitle((prevState) => !prevState);
	};

	return (
		<View style={{ ...styles.default, ...style }}>
			<ScrollView
				contentContainerStyle={styles.container}
				horizontal
				showsHorizontalScrollIndicator={false}
			>
				<CategoryButton
					array={orderArray}
					title="Order"
					arrowEnabled
					resetTitleHandler={resetTitleHandler}
					resetState={resetTitle}
				/>
				<CategoryButton
					array={ratingArray}
					title="Content Rating"
					resetTitleHandler={resetTitleHandler}
					resetState={resetTitle}
				/>
				<CategoryButton
					array={statusArray}
					title="Status"
					resetTitleHandler={resetTitleHandler}
					resetState={resetTitle}
				/>
				<CategoryButton
					title="Reset"
					arrowShow={false}
					resetTitleHandler={resetTitleHandler}
					resetState={resetTitle}
				/>
				{/*<CategoryButton title={'Year'} />*/}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	default: {
		width: '100%',
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 10,
		paddingHorizontal: DIMENSIONS.padding,
		paddingBottom: 10,
		paddingRight: 60,
	},
});

export default Category;
