const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3



describe('mycalculatorapp', () => {
    const provider = anchor.Provider.local();
	anchor.setProvider(provider);
    const calculator = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Mycalculatorapp;


    it('Create a calculator', async() => {
        await program.rpc.create("Welcome to solana", {
            accounts: {
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator],
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting === "Welcome to Solana");
    })

    it('Adds two numbers', async() => {
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts: {
                calculator: calculator.publicKey
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(5)));
    })

    it('Subtract two numbers', async() => {
        await program.rpc.subtract(new anchor.BN(5), new anchor.BN(1), {
            accounts:{
                calculator: calculator.publicKey
            }
        });
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(4)))
    })

    it('Multiply two numbers', async() => {
        await program.rpc.multiply(new anchor.BN(2), new anchor.BN(2), { accounts:  {
            calculator: calculator.publicKey
        }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.result.eq(new anchor.BN(4)))
    })

    it('Divide two numbers', async() => {
        await program.rpc.division(new anchor.BN(4), new anchor.BN(3), {accounts : {
            calculator: calculator.publicKey
        }
    })
    const account = program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(4)))
    assert.ok(account.result.eq(new anchor.BN(1))
    })
})