import { LogoIndica } from '@/components/LogoIndica';

export function Enxame({ largura = 560, rotulo = 'INDICA' }: { largura?: number; rotulo?: string }) {
  return <div className="marca-indica" style={{ width: largura, maxWidth: '100%' }}><LogoIndica altura={168} rotulo={rotulo} /></div>;
}

export function Ponte({ rotulo }: { rotulo?: string }) {
  return <div className="ponte">
    <span className="ponte__ponto ponte__ponto--rosa" aria-hidden="true" />
    <span className="ponte__ponto ponte__ponto--menta" aria-hidden="true" />
    <span className="ponte__ponto ponte__ponto--amarelo" aria-hidden="true" />
    {rotulo ? <span className="ponte__rotulo">{rotulo}</span> : null}
  </div>;
}
