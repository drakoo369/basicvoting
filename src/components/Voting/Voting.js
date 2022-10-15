import React, { useEffect, useState } from "react";
import Web3 from "web3";
import {
  BaseWrapper,
  BotonVote,
  ButtonsDiv,
  CardDescription,
  CardImg,
  CardStructure,
  CardsWrapper,
  CardTitle,
  ImgWrapperCard,
  MainWrapper,
  GeneralDescription,
  CenterWrapperStart,
  CardTitle2,
} from "./VotingStyle";
import StakingImage from "../../images/bank.png";
import BurnImage from "../../images/fire.png";

import {
  mintToken,
  onConnect,
  getProposals,
  vote,  
  selectedAccountFunction, fetchAccountData, chainId,
} from "../Utils/Web3Interface.js";

let provider = "https://matic-mumbai.chainstacklabs.com";

function Voting() {

  const [proposal1, setProposal1] = useState(0);
  const [proposal2, setProposal2] = useState(0);
  const [stakingVotes, setStakingVotes] = useState(null);
  const [stakingVotes2, setStakingVotes2] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [accountConnected, setAccountConnected] = useState(null);
  const [chain, setChain] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    //Proposal #1
    getProposals(0)
      .then((proposalVotes) => {
        let nameDecoded = Web3.utils.toAscii(proposalVotes.name)
        let finalName = nameDecoded.replace(/[^a-z]/gi, '');
        console.log("nameDecoded",finalName);
        setProposal1(finalName);
        setStakingVotes(proposalVotes.voteCount)
      })
      .catch((err) => {
        console.log(err);
      });

    //Proposal #2
    getProposals(1)
      .then((proposalVotes) => {
        let nameDecoded = Web3.utils.toAscii(proposalVotes.name)
        let finalName = nameDecoded.replace(/[^a-z]/gi, '');
        console.log("nameDecoded",finalName);
        setProposal2(finalName);
        setStakingVotes2(proposalVotes.voteCount)
      })
      .catch((err) => {
        console.log(err);
      });

      onConnect();
      fetchSelectedAccount();
   });

  const fetchSelectedAccount = async() => {
     await fetchAccountData()
      .then((selectedAccount) => {
        setSelectedAccount(selectedAccount);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Obtiene el balance
  const getBalanceMatic = async (arg) =>{
    let newWeb3 = new Web3(provider)
    let address = newWeb3.utils.toChecksumAddress(arg);
    let balance = await newWeb3.eth.getBalance(address);
    let maticBalance = Web3.utils.fromWei(balance, 'ether'); //Convierte de Weis a Ether
    
    setBalance(maticBalance);
  }

  
  const fetchAccountConnected = async () => {
    selectedAccountFunction()
      .then((accountConnected) => {
        setAccountConnected(accountConnected);
        getBalanceMatic(accountConnected);
      })
      .catch((err) => {
        console.log(err);
      });
      
      
  };

  useEffect(() => {
    setInterval(() => {
       fetchSelectedAccount();
       setChain(chainId);
       console.log("CHAIN!!!!!", chain);
     }, [500]);
    
  }, [selectedAccount]);

  useEffect(async ()  => {
    setInterval(() => {
      fetchAccountConnected();
     }, [500]);
  }, [accountConnected]);



  const voting = (arg) => {
    vote(arg)
      .then((tx) => {
        console.log("TX ID!!!!!!!!!!!!!!!!!!!!!!!! =>",tx);
        setMessage("Transaccion exitosa");

      })
      .catch((err) => {
        setMessage("La transacción no se puede completar");
        console.log(err);
      });
  };

  console.log(proposal1);

  const walletConnector = () =>{
    onConnect()
    fetchAccountConnected()
    
  }

  return (
    <>
      <MainWrapper>
        <BaseWrapper>
          <CenterWrapperStart>
          <CardTitle2> Para continuar por favor conecta tu wallet </CardTitle2>
          {
            selectedAccount ? <>
          <p>Wallet is : </p>
                
          </> :
        <BotonVote onClick={() => walletConnector()}>
          Connect Wallet  
        </BotonVote>
          }
              {
chainId == 80001 ?
(                <CardsWrapper>
  <CardStructure>
    <CardTitle>Wallet address</CardTitle> 
    <CardDescription style={{fontSize:"12px"}}>
      {accountConnected}
    </CardDescription>
  </CardStructure>
  
  <CardStructure>
    <CardTitle>Matic Balance</CardTitle> 
    <CardDescription>{balance} </CardDescription>
  </CardStructure>
  
     
    <CardStructure>
    <CardTitle>Chain ID</CardTitle> 
    <CardDescription> {chainId}</CardDescription>
  </CardStructure>

</CardsWrapper>):
<CardsWrapper>
<CardStructure>
  <CardTitle style={{color:"red",fontSize:"25px",textShadow:"0 0 5px red "}}>You are on the wrong chain</CardTitle> 
  
</CardStructure>
</CardsWrapper>

              }

            <CardTitle> Votacion de propuestas para TestDao </CardTitle>

            <GeneralDescription>
            Aqui encontrarás las propuestas actuales de TestDao, podrás ver también la cantidad de votos actuales de cada una y votar por la que consideres más conveniente.
            </GeneralDescription>
            
          </CenterWrapperStart>
          
          <CardsWrapper>
            {/*Staking*/}
            <CardStructure>

              <CardTitle> {proposal1}</CardTitle>
              <ImgWrapperCard>
                <CardImg src={StakingImage} />
              </ImgWrapperCard>

              <CardDescription>
                Esta propuesta promueve que los assets nativos de TestDao se pongan en Staking para generar dividendos y repartirlos entre los miembros del DAO.
              </CardDescription>
              <CardDescription>
                Cantidad de votos: {stakingVotes} 
                
              </CardDescription>
              <ButtonsDiv>
                <BotonVote onClick={() => voting(0)}>
                  Votar
                </BotonVote>

              </ButtonsDiv>
            </CardStructure>

            {/*Burn*/}
            <CardStructure>
              <CardTitle> {proposal2} </CardTitle>
              <ImgWrapperCard>
                <CardImg src={BurnImage} />
              </ImgWrapperCard>
              <CardDescription>
              Esta propuesta promueve que los assets nativos de TestDao se quemen (Burn) para crear una dinamica deflaccionaria que aumente el valor de los assets nativos.
              </CardDescription>
              <CardDescription>
              Cantidad de votos: {stakingVotes2}
              </CardDescription>
              <ButtonsDiv>
                <BotonVote onClick={() => voting(1)}>
                  Votar
                </BotonVote>

              </ButtonsDiv>
            </CardStructure>
              

          </CardsWrapper>
          
          <CardsWrapper>
          <p style={{color:"#67FFE3",fontSize:"25px"}}>{message}</p>
          </CardsWrapper>

        </BaseWrapper>
      </MainWrapper>
    </>
  );
}

export default Voting;
