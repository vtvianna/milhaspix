O projeto foi desenvolvido para replicar com precisão o layout original da plataforma MilhasPix, com um fluxo completo de quatro etapas:

Escolha a companhia aérea O usuário seleciona o programa de fidelidade desejado (LATAM Pass, Smiles, TudoAzul, TAP Miles&Go).

Oferte suas milhas Campos dinâmicos permitem definir:

Quantidade total de milhas;
Valor desejado por cada 1.000 milhas (monetário, formatado em R$);
“Definir média de milhas por passageiro” ;
Visualização em tempo real do ranking de ofertas.
Insira os dados do programa Tela de confirmação com campos de CPF, senha, login e telefone necessários para validação no sistema.

Pedido finalizado Exibe uma tela de sucesso com as informações da transação e mensagem confirmando o envio da oferta.

Tela dinâmica com quatro etapas:

Layout idêntico ao design original MilhasPix;
Sidebar com linha azul conectando as etapas;
Inputs com ícones (Plane, DollarSign) e feedback visual;
Cálculo automático de “Receba até R$ X,XX” conforme digitação;
Ranking das ofertas obtido da API /simulate-offers-list;
Persistência real com POST /offers;
Atualização dinâmica em “Minhas Ofertas”.
 Ranking de Ofertas
Mostra a posição e valor médio das ofertas mais recentes;
Exibe “Aguardando milhas...” até que valores sejam digitados;
Atualiza automaticamente após salvar nova oferta.


 -Instruções para rodar localmente:
  
  1. Instale a CLI da Vercel (apenas uma vez):
     npm i -g vercel
 
  2. Na raiz do projeto, rode o comando:
     vercel dev
  
  Isso vai simular o ambiente da Vercel:
  - Frontend React em http://localhost:3000
  - Rotas da API disponíveis em http://localhost:3000/api/offers
  
  