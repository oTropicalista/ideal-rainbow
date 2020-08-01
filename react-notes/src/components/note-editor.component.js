import React, { Component } from "react";
import NoteDataService from "../services/note.service";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default class Editor extends Component {
    constructor(props) {
        super(props);
        this.teste = this.teste.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.saveNote = this.saveNote.bind(this);

        this.state = {
            id: null,
            titulo: props.currentNote.titulo,
            conteudo: props.currentNote.conteudo,
            existe: props.existe,

            submitted: false
        };

        
    }

    teste() {
        console.log('Titulo' + this.state.titulo);
        console.log('Conteudo' + this.state.conteudo);
    }

    onChangeTitle(e) {
        this.setState({
            titulo: e.target.value
        });
        console.log("onChangeTtile" + e.target.value);
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

                    submitted: true
                });
                console.log("response.data:\n" + response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const Note = this.props.currentNote;

        return(
            <div>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={Note.titulo}
                        onChange={this.onChangeTitle}
                        required
                        name="titulo" />
                </div>
                <SunEditor
                    name="conteudo"
                    id="conteudo"
                    width="100%"
                    setOptions={{
                        height: 300,
                        buttonList: [['undo', 'redo'], ['bold', 'underline', 'italic', 'strike'], ['indent', 'outdent'], ['table', 'list', 'horizontalRule']]//buttonList.formatting // Or Array of button list, eg. [['font', 'align'], ['image']]
                    }}
                    setContents={Note.conteudo}
                    onChange={this.onChangeContent} />

                <button onClick={this.saveNote} className="btn btn-sucess">Submit</button>
            </div>
        );
    }
};
