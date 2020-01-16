import React, { Component } from "react";
import './team.css';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamCalendar: "",
    }
  }

componentDidMount(){
  const id = parseInt(this.props.match.params.id);
  const url = `https://api.football-data.org/v2/competitions/2015/matches`
  const config = {
    method: "GET",
    headers: {
      "X-Auth-Token": "bcf12a417c944a1093f0733c030fcbe4",
    },
  }
  fetch(url, config)
  .then(res => res.json())
  .then(res => this.setState({ teamCalendar: res.matches.filter(item => item.homeTeam.id === id || item.awayTeam.id === id) }))
}
   
  render() {
    const id = parseInt(this.props.match.params.id);
    const { teamCalendar } = this.state;
      if (teamCalendar) {
      return(
        <div className="Team">
          <h2>
            Résultats et Calendrier de {teamCalendar[0].homeTeam.id === id ? teamCalendar[0].homeTeam.name : teamCalendar[0].awayTeam.name}
          </h2>
            <NavLink
              className="nav-link active"
              to={`/teams`}
            >
              <button type="button" className="btn btn-primary">Retour au classement</button>
            </NavLink>
          {teamCalendar.map((team, i) =>
            <div className={`item-wrapper line${i % 2 === 0}`}>
              <p>{moment(new Date(team.utcDate)).format('DD/MM/YY')}</p>
              <p className="homeTeam">{team.homeTeam.name}</p>
              <span>{team.score.fullTime.homeTeam}-{team.score.fullTime.awayTeam}</span>
              <p className="awayTeam">{team.awayTeam.name}</p>
            </div>
          )}
        </div>
        )
      } else {
        return null
      }
    }
}

export default Team;