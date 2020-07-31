import React, { Component } from "react";
import NoteDataService from "../services/note.service";

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.getNote = this.getNote.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            currentNote: {
                id: null,
                titulo: "",
                conteudo: "",
                concluido: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getNote(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const titulo = e.target.value;

        this.setState(function (prevState) {
            return {
                currentNote: {
                    ...prevState.currentNote,
                    titulo: titulo
                }
            };
        });
    }

    onChangeContent(e) {
        const conteudo = e.target.value;

        this.setState(prevState => ({
            currentNote: {
                ...prevState.currentNote,
                conteudo: conteudo //titulo' is not defined
            }
        }));
    }

    getNote(id) {
        NoteDataService.get(id)
            .then(response => {
                this.setState({
                    currentNote: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStatus(status) {
        var data = {
            id: this.state.currentNote.id,
            titulo: this.state.currentNote.titulo,
            conteudo: this.state.currentNote.conteudo,
            concluido: status
        };

        NoteDataService.update(this.state.currentNote.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentNote: {
                        ...prevState.currentNote,
                        concluido: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateNote() {
        NoteDataService.update(
            this.state.currentNote.id,
            this.state.currentNote
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Nota atualizada"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteNote() {
        NoteDataService.delete(this.state.currentNote.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/notes')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentNote } = this.state;

        return (
            <div>
                {currentNote ? (
                    <div className="edit-form">
                        <h4>Nota</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="titulo">Titulo</label>
                                <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                value={currentNote.titulo}
                                onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="conteudo">Conteudo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="conteudo"
                                    value={currentNote.conteudo}
                                    onChange={this.onChangeContent}
                                />
                            </div>
                            <div className="form-group">
                                <label><b>Status:</b></label>
                                { currentNote.concluido ? "Concluida" : "Pendente" }
                            </div>
                        </form>

                        {currentNote.concluido ? (
                            <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateStatus(false)}
                            >
                                Pendente
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStatus(true)}
                            >
                                Concluida
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteNote}
                        >
                            Apagar
                        </button>

                        <button
                            className="badge badge-sucess"
                            onClick={this.updateNote}
                        >
                            Salvar
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Clique na nota</p>
                    </div>
                )}
            </div>
        );
    }
}