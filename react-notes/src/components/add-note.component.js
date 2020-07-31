import React, { Component } from "react";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import NoteDataService from "../services/note.service";

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.newNote = this.newNote.bind(this);

        this.state = {
            id: null,
            titulo: "",
            conteudo: "",
            concluido: false,

            submitted: false
        };
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

    testEditor(content) {
        console.log(content);
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Submitted com sucesso</h4>
                        <button className="btn btn-sucess" onClick={this.newNote}>Add</button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="titulo"
                                required
                                value={this.state.titulo}
                                onChange={this.onChangeTitle}
                                name="titulo" />
                        </div>
                            <SunEditor
                                name="conteudo"
                                id="conteudo"
                                onChange={this.onChangeContent}
                                width="100%"
                                autoFocus={true}
                                showToolbar={true}
                                setOptions={{
                                    height: 300,
                                    buttonList: buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]
                                    // Other option
                                }} />

                        <button onClick={this.saveNote} className="btn btn-sucess">Submit</button>
                    </div>
                )}
            </div>
        );
    }
}