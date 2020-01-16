import React, { Component } from "react";
import { Table } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: "",
    }
  }

    componentDidMount(){
      const url = "https://api.football-data.org/v2/competitions/2015/standings"
      const config = {
      method: "GET",
      headers: {
        "X-Auth-Token": "bcf12a417c944a1093f0733c030fcbe4",
      },
    }
      fetch(url, config)
      .then(res => res.json())
      .then(res => this.setState({ teams: res}))
    }

    render() {
      const { teams } = this.state;
      if (teams) {
        return(
          <div className="Team">
            <h2>Classement Ligue 1 saison 2019/2020</h2>
            <Table striped className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">pos</th>
                  <th scope="col">Equipe</th>
                  <th scope="col">Pts</th>
                  <th scope="col">J.</th>
                  <th scope="col">G.</th>
                  <th scope="col">N.</th>
                  <th scope="col">P.</th>
                  <th scope="col">Buts P.</th>
                  <th scope="col">Buts C.</th>
                  <th scope="col">Diff</th>
                </tr>
              </thead>
              <tbody>
                {teams.standings[0].table.map(team => (
                <tr className="table-wrapper" key={team.team.id}>
                  <td>{team.position}</td>
                    <NavLink
                      id={team.team.id}
                      to={`/teams/${team.team.id}`}>
                      <td><img className="team-img" src={team.team.crestUrl} alt="" />{team.team.name}</td>
                    </NavLink>
                  <td>{team.points}</td>
                  <td>{team.playedGames}</td>
                  <td>{team.won}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td>{team.goalDifference}</td>
                </tr>
            ))}
              </tbody>
            </Table>
          </div>
        )
        } else {
            return null
        }
    }
}

export default Home;