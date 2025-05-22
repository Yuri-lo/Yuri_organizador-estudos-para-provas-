from flask import Flask, render_template, request, redirect, url_for, session, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = "sua_chave_secreta"  # importante para sessões

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="sua_senha",
        database="estudos"
    )

@app.route('/')
def home():
    if 'usuario' in session:
        return render_template('principal.html', usuario=session['usuario'])
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        usuario = request.form['usuario']
        senha = request.form['senha']

        conexao = conectar()
        cursor = conexao.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuarios WHERE usuario=%s AND senha=%s", (usuario, senha))
        usuario_bd = cursor.fetchone()
        conexao.close()

        if usuario_bd:
            session['usuario'] = usuario_bd['usuario']
            return redirect(url_for('home'))
        else:
            flash("Usuário ou senha inválidos.")
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('usuario', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)
