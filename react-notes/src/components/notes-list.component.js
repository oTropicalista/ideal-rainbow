import React, { Component } from "react";
import NoteDataService from "../services/note.service";
// import { Link } from "react-router-dom";
import Editor from "./note-editor.component";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default class NoteList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveNotes = this.retrieveNotes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveNote = this.setActiveNote.bind(this);
        this.removedAllNotes = this.removedAllNotes.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.newNote = this.newNote.bind(this);

        this.state = {
            notes: [],
            currentNote: null,
            currentIndex: -1,
            searchTitle: "",
            existe: false,

            id: null,
            titulo: "",
            conteudo: "",
            concluido: false,

            submitted: false,

            enableBar: true,
        };
    }

    componentDidMount() {
        this.retrieveNotes();
    }

    onChangeTitle(e) {
        this.setState({
            titulo: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            conteudo: e
        });
        console.log("onChangeContent\n" + e);
    }

    saveNote() {
        var data = {
            titulo: this.state.titulo,
            conteudo: this.state.conteudo
        };

        NoteDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    titulo: response.data.titulo,
                    conteudo: response.data.conteudo,
                    concluido: response.data.concluido,

                    submitted: true
                });
                console.log("response.data:\n" + response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newNote() {
        this.setState({
            id: null,
            titulo: "",
            conteudo: "",
            concluido: false,

            submitted: false
        });
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
            existe: true,
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

    handleToolBarOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
}

    render() {
        const { searchTitle, notes, currentNote, currentIndex, existe } = this.state;

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
                                    (index === currentIndex ? "" : "")
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
                            
                            <Editor
                                currentNote={currentNote}
                                exite={existe}
                            />

                            <button onClick={this.saveNote} className="btn btn-sucess">Submit</button>
                        </div>
                    ) : (
                            <div>
                                <Editor
                                    currentNote={""}
                                    existe={existe}
                                />

                                <button onClick={this.saveNote} className="btn btn-sucess">Submit</button>
                            </div>
                    )}
                </div>
            </div>
        );
    }
};
