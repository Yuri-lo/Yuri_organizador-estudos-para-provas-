import mysql.connector
from datetime import datetime

# ==============================
# CLASSE PRINCIPAL: Estudo
# ==============================
class Estudo:
    def __init__(self, materia, topico, data_prova):
        self.materia = materia
        self.topico = topico
        self.__data_prova = data_prova
        self.finalizado = False

    def exibir_dados(self):
        print(f"[Estudo] Matéria: {self.materia}")
        print(f"Tópico: {self.topico}")
        print(f"Data da Prova: {self.__data_prova}")
        print(f"Finalizado: {'Sim' if self.finalizado else 'Não'}")

    def get_data_prova(self):
        return self.__data_prova

    def set_data_prova(self, nova_data):
        self.__data_prova = nova_data

    def dias_para_prova(self):
        try:
            hoje = datetime.now()
            data_prova = datetime.strptime(self.__data_prova, "%d/%m/%Y")
            return (data_prova - hoje).days
        except ValueError:
            return None

    def marcar_como_finalizado(self):
        self.finalizado = True


# ==============================
# SUBCLASSE: EstudoComRevisao
# ==============================
class EstudoComRevisao(Estudo):
    def __init__(self, materia, topico, data_prova, revisado=False):
        super().__init__(materia, topico, data_prova)
        self.revisado = revisado

    def exibir_dados(self):
        super().exibir_dados()
        print(f"Revisado: {'Sim' if self.revisado else 'Não'}")

    def marcar_revisao(self):
        self.revisado = True


# ==============================
# BANCO DE DADOS MYSQL
# ==============================

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",         # Altere se necessário
        password="sua_senha",# Altere para a senha do seu MySQL
        database="estudos_db"
    )

def criar_tabela():
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS estudos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            materia VARCHAR(255),
            topico VARCHAR(255),
            data_prova VARCHAR(20)
        )
    """)
    conexao.commit()
    conexao.close()

def inserir_estudo(estudo):
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute("INSERT INTO estudos (materia, topico, data_prova) VALUES (%s, %s, %s)",
                   (estudo.materia, estudo.topico, estudo.get_data_prova()))
    conexao.commit()
    conexao.close()
    print(f"Estudo de {estudo.materia} inserido no banco.\n")

def listar_estudos():
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute("SELECT * FROM estudos")
    resultados = cursor.fetchall()
    conexao.close()

    print("=== Estudos Cadastrados ===")
    for linha in resultados:
        print(f"ID: {linha[0]} | Matéria: {linha[1]} | Tópico: {linha[2]} | Data: {linha[3]}")
    print()

def excluir_estudo(id_estudo):
    conexao = conectar()
    cursor = conexao.cursor()
    cursor.execute("DELETE FROM estudos WHERE id = %s", (id_estudo,))
    conexao.commit()
    conexao.close()
    print(f"Estudo com ID {id_estudo} excluído do banco.\n")


# ==============================
# BLOCO DE TESTES (main)
# ==============================

if __name__ == "__main__":
    criar_tabela()

    estudo1 = EstudoComRevisao("Física", "Leis de Newton", "30/05/2025")
    estudo1.marcar_revisao()
    estudo1.marcar_como_finalizado()

    estudo1.exibir_dados()
    dias = estudo1.dias_para_prova()
    print(f"\nFaltam {dias} dias para a prova.\n")

    inserir_estudo(estudo1)
    listar_estudos()
    # excluir_estudo(1)
