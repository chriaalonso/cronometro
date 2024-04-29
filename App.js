import { StatusBar } from "expo-status-bar";
import { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

export class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      button: 'VAI',
      ultimo: null,
    };

    this.timer = null;
    this.go = this.go.bind(this);
    this.stop = this.stop.bind(this);
  }

  go() {
    if(this.timer != null) {
      clearInterval(this.timer);
      this.timer = null;
      this.setState({button: 'VAI'});
    } else {
      this.timer = setInterval( () => {
        this.setState({number: this.state.number + 0.016})
      }, 1);

      this.setState({button: 'PARAR'});
    }
  }

  stop() {
    if(this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      ultimo: this.state.number,
      number: 0,
      button: 'VAI',
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Image
          source={require("./assets/img/cronometro.png")}
          style={styles.cronometro}
        />

        <Text style={styles.timer}>{this.state.number.toFixed(2)}</Text>

        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.go}>
            <Text style={styles.btnTexto}>{this.state.button}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.stop}>
            <Text style={styles.btnTexto}>PARAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.areaUltima}>
            <Text style={styles.textoCorrida}>
              {this.state.ultimo > 0 ? 'Último tempo:' + this.state.ultimo.toFixed(2) + 's' : ''}
            </Text>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00aeef",
  },
  timer: {
    marginTop: -160,
    color: "#fff",
    fontSize: 65,
    fontWeight: "bold",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 70,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    margin: 17,
    borderRadius: 5,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00aeef",
  },
  areaUltima: {
    marginTop: 40,
  },
  textoCorrida: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#fff',
  }
});

export default App;
