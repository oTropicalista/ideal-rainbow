import React, { Component } from "react";
import NoteDataService from "../services/note.service";
import { Link } from "react-router-dom";

export default class NoteList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveNotes = this.retrieveNotes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveNote = this.setActiveNote.bind(this);
        this.removedAllNotes = this.removedAllNotes.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            notes: [],
            currentNote: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveNotes();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        console.log("onChangeSearchTitle\n" + searchTitle);

        this.setState({
            searchTitle: searchTitle
        });
        console.log("SearchTile atual\n" + this.state.searchTitle);
    }

    retrieveNotes() {
        NoteDataService.getAll()
        .then(response => {
            this.setState({
                notes: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveNotes();
        this.setState({
            currentNote: null,
            currentIndex: -1
        });
    }

    setActiveNote(note, index) {
        this.setState({
            currentNote: note,
            currentIndex: index
        });
    }

    removedAllNotes() {
        NoteDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    searchTitle() {
        NoteDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            this.setState({
                notes: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const { searchTitle, notes, currentNote, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-12">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Chame pelo nome"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}>
                                Chame
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <h4>Lista de notas</h4>
                    <ul className="list-group">
                        {notes &&
                        notes.map((note, index) => (
                            <li
                                className={
                                    "list-group-item" +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveNote(note, index)}
                                key={index}
                            >
                                {note.titulo}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removedAllNotes}
                    >
                        Limpar a casa
                    </button>
                </div>
                <div className="col-md-8">
                    {currentNote ? (
                        <div>
                            <h4>Nota</h4>
                            <div>
                                <label><b>Titulo: </b></label>{" "}
                                {currentNote.titulo}
                            </div>
                            <div>
                                <label><b>Nota: </b></label>{" "}
                                {currentNote.conteudo}
                            </div>
                            <div>
                                <label><b>Status:</b></label>{" "}
                                {currentNote.concluido ? "Concluida" : "Pendente"}
                            </div>

                            <Link
                                to={"/notes" + currentNote.id}
                                className="badge badge-warning"
                            >
                                Editar
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Clique numa nota</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};
