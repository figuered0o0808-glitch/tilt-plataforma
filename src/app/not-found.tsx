import { Botao } from '@/components/Botao';
import { EstadoVazio } from '@/components/EstadoVazio';

export default function NaoEncontrado() {
  return (
    <div className="secao">
      <div className="container-estreito">
        <h1 className="sr-only">Página não encontrada</h1>
        <EstadoVazio
          titulo="Página não encontrada"
          descricao="O endereço que você abriu não existe neste site."
          acao={<Botao href="/">Voltar ao início</Botao>}
          desenho="busca"
        />
      </div>
    </div>
  );
}
