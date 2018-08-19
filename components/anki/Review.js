import React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Animated,
	Platform,
	PanResponder,
	Dimensions
} from "react-native";
import { white, red, green, blue } from "./../../utils/colors";

//import StatusButtons from "./../StatusButtons";
import Results from "./Results";
import ProgressBar from "../ProgressBar";

const DEVICE_WIDTH = Dimensions.get("window").width;

class Review extends React.Component {
	state = {
		card: 0,
		showBack: false,
		needReview: 0,
		gotCorrect: 0,
		xValue: new Animated.Value(0),
		fadeAnim: new Animated.Value(0.8),
		enter: new Animated.Value(0.8),
		showLeftSwipeText: false,
		showRightSwipeText: false
	};

	componentWillMount = () => {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({ value }) => {
			this.value = value;
		});

		// https://tutorialscapital.com/react-native-tinder-swipeable-card-views-dynamically-android-ios-tutorial/
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => false,

			onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

			onMoveShouldSetPanResponder: (evt, gestureState) => true,

			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

			onPanResponderMove: (evt, gestureState) => {
				// Code Continuously Executed when User Drags the card.
				this.state.xValue.setValue(gestureState.dx);

				if (gestureState.dx > DEVICE_WIDTH - 350) {
					this.setState({
						showRightSwipeText: true,
						showLeftSwipeText: false
					});
				} else if (gestureState.dx < -DEVICE_WIDTH + 350) {
					this.setState({
						showLeftSwipeText: true,
						showRightSwipeText: false
					});
				}

				// https://blog.nativebase.io/how-we-built-react-native-card-swiper-for-nativebase-d1cd32a506d1
				let val = Math.abs(gestureState.dx * 0.0013);
				let opa = Math.abs(gestureState.dx * 0.0022);
				if (val > 0.2) {
					val = 0.2;
				}
				Animated.timing(this.state.fadeAnim, {
					toValue: 0.8 + val
				}).start();
				Animated.spring(this.state.enter, {
					toValue: 0.8 + val,
					friction: 7
				}).start();
			},

			onPanResponderRelease: (evt, gestureState) => {
				// Code Executed when User Releases the Card.
				if (
					gestureState.dx < DEVICE_WIDTH - 150 &&
					gestureState.dx > -DEVICE_WIDTH + 150
				) {
					this.setState({
						showLeftSwipeText: false,
						showRightSwipeText: false
					});

					Animated.spring(
						this.state.xValue,
						{
							toValue: 0,
							speed: 5,
							bounciness: 10
						},
						{ useNativeDriver: true }
					).start();
				} else if (gestureState.dx > DEVICE_WIDTH - 150) {
					Animated.parallel(
						[
							Animated.timing(this.state.xValue, {
								toValue: DEVICE_WIDTH,
								duration: 200
							}),

							Animated.timing(this.cardOpacity, {
								toValue: 0,
								duration: 200
							})
						],
						{ useNativeDriver: true }
					).start(() => {
						this.setState(
							{
								showLeftSwipeText: false,
								showRightSwipeText: false
							},
							() => {
								this.nextCard();
								this.setState({
									gotCorrect: this.state.gotCorrect + 1
								});
								this.swiped();
							}
						);
					});
				} else if (gestureState.dx < -DEVICE_WIDTH + 150) {
					Animated.parallel(
						[
							Animated.timing(this.state.xValue, {
								toValue: -DEVICE_WIDTH,
								duration: 200
							}),

							Animated.timing(this.cardOpacity, {
								toValue: 0,
								duration: 200
							})
						],
						{ useNativeDriver: true }
					).start(() => {
						this.setState(
							{
								showLeftSwipeText: false,
								showRightSwipeText: false
							},
							() => {
								this.nextCard();
								this.setState({
									needReview: this.state.needReview + 1
								});
								this.swiped();
							}
						);
					});
				}
			}
		});

		this.cardOpacity = new Animated.Value(1);
	};

	componentWillUnmount() {
		this.animatedValue.removeAllListeners();
	}

	swiped = () => {
		Animated.timing(this.state.fadeAnim, { toValue: 1 }).start();
		Animated.spring(this.state.enter, { toValue: 1, friction: 7 }).start();
	};

	flipCard = () => {
		// https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native

		if (this.value >= 90) {
			Animated.spring(this.animatedValue, {
				toValue: 0,
				friction: 8,
				tension: 10
			}).start();
		} else {
			Animated.spring(this.animatedValue, {
				toValue: 180,
				friction: 8,
				tension: 10
			}).start();
		}
		this.setState({ showBack: !this.state.showBack });
	};

	nextCard = () => {
		this.animatedValue = new Animated.Value(0);
		this.value = 0;
		this.animatedValue.addListener(({ value }) => {
			this.value = value;
		});
		this.setState({
			card: this.state.card + 1,
			showBack: false,
			xValue: new Animated.Value(0)
		});
		this.cardOpacity = new Animated.Value(1);
		this.state.enter.setValue(0.8);
		this.state.fadeAnim.setValue(0.8);
	};

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: null }));
	};

	reset = () => {
		this.setState({
			card: 0,
			showBack: false,
			needReview: 0,
			gotCorrect: 0,
			xValue: new Animated.Value(0),
			fadeAnim: new Animated.Value(0.8),
			enter: new Animated.Value(0.8),
			showLeftSwipeText: false,
			showRightSwipeText: false
		});
	};

	showBgColor = () => {
		const { showLeftSwipeText, showRightSwipeText } = this.state;
		if (showLeftSwipeText === true && showRightSwipeText === false)
			return red;
		if (showLeftSwipeText === false && showRightSwipeText === true)
			return green;
		else return blue;
	};

	render() {
		const { deck } = this.props;
		const { card, showBack, enter } = this.state;

		const rotateCard = this.state.xValue.interpolate({
			inputRange: [-200, 0, 200],
			outputRange: ["-20deg", "0deg", "20deg"]
		});

		this.backInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ["-180deg", "-360deg"]
		});

		const backAnimatedStyle = {
			transform: [
				{ translateX: this.state.xValue },
				{ rotateY: this.backInterpolate },
				{ rotate: rotateCard }
			]
		};

		this.frontInterpolate = this.animatedValue.interpolate({
			inputRange: [0, 180],
			outputRange: ["0deg", "-180deg"]
		});

		const frontAnimatedStyle = {
			transform: [{ rotateY: this.frontInterpolate }]
		};

		const scale = enter;

		if (card === deck.cards.length) {
			return (
				<Results
					goBack={this.goBack}
					reset={this.reset}
					right={this.state.gotCorrect}
					wrong={this.state.needReview}
				/>
			);
		} else {
			return (
				<View
					style={[
						styles.container,
						{ backgroundColor: this.showBgColor() }
					]}
				>
					{this.state.showLeftSwipeText ? (
						<Text style={styles.swipeText}>Need more Review</Text>
					) : null}
					{this.state.showRightSwipeText ? (
						<Text style={styles.swipeText}>I got it Right!</Text>
					) : null}

					{(this.state.showLeftSwipeText ||
						this.state.showRightSwipeText) &&
						card < deck.cards.length - 1 && (
							<Animated.View
								{...this.panResponder.panHandlers}
								style={[
									styles.nextCard,
									{ transform: [{ scale }] },
									{ opacity: this.state.fadeAnim }
								]}
							/>
						)}

					{showBack ? (
						<Animated.View
							{...this.panResponder.panHandlers}
							style={[
								styles.vindexCard,
								{
									opacity: this.cardOpacity
								},
								backAnimatedStyle
							]}
						>
							<Text style={styles.cardText}>
								{deck.cards[card].back}
							</Text>
						</Animated.View>
					) : (
						<Animated.View
							style={[styles.vindexCard, frontAnimatedStyle]}
						>
							<Text style={styles.cardText}>
								{deck.cards[card].front}
							</Text>
						</Animated.View>
					)}
					<TouchableOpacity
						style={styles.flipArea}
						onPress={this.flipCard}
					/>

					<ProgressBar i={card + 1} max={deck.cards.length} />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	swipeText: {
		position: "absolute",
		top: 50,
		width: "100%",
		textAlign: "center",
		color: white,
		fontSize: 16,
		backgroundColor: "transparent"
	},
	vindexCard: {
		backgroundColor: white,
		padding: 25,
		width: "80%",
		height: "50%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backfaceVisibility: "hidden"
	},
	nextCard: {
		backgroundColor: white,
		width: "80%",
		height: "50%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10
	},
	cardText: {
		fontSize: 25,
		textAlign: "center"
	},
	flipArea: {
		backgroundColor: "transparent",
		width: "60%",
		height: "20%",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center"
	}
});

function mapStateToProps(state, props) {
	return {
		deck: state.decks[props.navigation.state.params.entryId]
	};
}

export default connect(
	mapStateToProps,
	null
)(Review);

/* 
//ios
shadowColor: "rgba(0,0,0,0.34)",
shadowOffset: {
	width: 0,
	height: 0
},
shadowRadius: 3,
shadowOpacity: 1,
//android
elevation: 1
*/
