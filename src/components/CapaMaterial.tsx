import { arquivoPublico } from '@/lib/format';

/**
 * Capa de uma publicacao.
 *
 * Quando a organizacao envia uma imagem, ela aparece. Quando nao envia, entra
 * uma capa gerada com a malha de pontos da marca sobre o tom do tema, para que
 * a estante nunca tenha buraco nem imagem de banco.
 */
export function CapaMaterial({
  capa,
  titulo,
  cor,
  alta,
}: {
  capa?: string;
  titulo: string;
  cor: string;
  alta?: boolean;
}) {
  const proporcao = alta ? '3 / 4' : '4 / 3';

  if (capa) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={arquivoPublico(capa)}
        alt=""
        className="capa"
        style={{ aspectRatio: proporcao }}
      />
    );
  }

  return (
    <div className="capa capa--gerada" style={{ aspectRatio: proporcao, background: cor }}>
      <span className="malha capa__malha" aria-hidden="true" />
      <span className="capa__titulo">{titulo}</span>
    </div>
  );
}
