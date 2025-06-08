export const states = {
    PARADO_IZQ: 0,
    PARADO_DER: 1,
    AGACHADO_IZQ: 2,
    AGACHADO_DER: 3,
    CAMINAR_IZQ: 4,
    CAMINAR_DER: 5,
    SALTAR_IZQ: 6,
    SALTAR_DER: 7,
    CAER_IZQ: 8,
    CAER_DER: 9,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class ParadoIzq extends State {
    constructor(jugador) {
        super('PARADO IZQ');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("paradoIzquierda");
        this.jugador.maxFrames = 4; // Número máximo de frames en la animación        
    }

    handleInput(input) {
        if (input === "PRESS right") this.jugador.setState(states.CAMINAR_DER);
        else if (input === "PRESS down") this.jugador.setState(states.AGACHADO_IZQ);
        else if (input === "PRESS left") this.jugador.setState(states.CAMINAR_IZQ);
        else if (input === "PRESS up") {
            this.jugador.saltando = true;
            this.jugador.setState(states.SALTAR_IZQ);
        }

        if (this.jugador.velocidad > 0) {
            this.jugador.setState(states.CAMINAR_DER);
        } else if (this.jugador.velocidad < 0) {
            this.jugador.setState(states.CAMINAR_IZQ);
        }
    }
}

export class ParadoDer extends State {
    constructor(jugador) {
        super('PARADO DER');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("paradoDerecha");
        this.jugador.maxFrames = 4; // Número máximo de frames en la animación        
    }

    handleInput(input) {
        if (input === "PRESS left") this.jugador.setState(states.CAMINAR_IZQ);
        else if (input === "PRESS down") this.jugador.setState(states.AGACHADO_DER);
        else if (input === "PRESS right") this.jugador.setState(states.CAMINAR_DER);
        else if (input === "PRESS up") {
            this.jugador.saltando = true;
            this.jugador.setState(states.SALTAR_DER);
        }

        if (this.jugador.velocidad < 0) {
            this.jugador.setState(states.CAMINAR_IZQ);
        } else if (this.jugador.velocidad > 0) {
            this.jugador.setState(states.CAMINAR_DER);
        }
    }
}

export class AgachadoDer extends State {
    constructor(jugador) {
        super('AGACHADO DER');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("agachadoDerecha");
        this.jugador.fps = 8; // Frames por segundo
        this.jugador.maxFrames = 3; // Número máximo de frames en la animación
    }

    handleInput(input) {
        if (input === "PRESS left") this.jugador.setState(states.CAMINAR_IZQ);
        else if (input === "PRESS right") this.jugador.setState(states.CAMINAR_DER);
        else if (input === "PRESS up") this.jugador.setState(states.PARADO_DER);
    }
}

export class AgachadoIzq extends State {
    constructor(jugador) {
        super('AGACHADO IZQ');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("agachadoIzquierda");
        this.jugador.fps = 8; // Frames por segundo
        this.jugador.maxFrames = 3; // Número máximo de frames en la animación
    }

    handleInput(input) {
        if (input === "PRESS right") this.jugador.setState(states.CAMINAR_DER);
        else if (input === "PRESS left") this.jugador.setState(states.CAMINAR_IZQ);
        else if (input === "PRESS up") this.jugador.setState(states.PARADO_IZQ);
    }
}

export class CaminarIzq extends State {
    constructor(jugador) {
        super('CAMINAR IZQ');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("caminarIzquierda");
        this.jugador.velocidad = -this.jugador.maxVelocidad;
        this.jugador.fps = 16;
        this.jugador.maxFrames = 7; // Número máximo de frames en la animación
    }

    handleInput(input) {
        if (input === "PRESS right") this.jugador.setState(states.CAMINAR_DER);
        else if (input === "PRESS down") this.jugador.setState(states.AGACHADO_IZQ);
        else if (input === "RELEASE left") this.jugador.setState(states.PARADO_IZQ);
        else if (input === "PRESS up") {
            this.jugador.saltando = true;
            this.jugador.setState(states.SALTAR_IZQ);
        }
    }

    exit() {
        if (!this.jugador.saltando) {
            this.jugador.velocidad = 0;
        }
    }
}

export class CaminarDer extends State {
    constructor(jugador) {
        super('CAMINAR DER');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("caminarDerecha");
        this.jugador.velocidad = this.jugador.maxVelocidad;
        this.jugador.fps = 16;
        this.jugador.maxFrames = 7; // Número máximo de frames en la animación
    }

    handleInput(input) {
        if (input === "PRESS left") this.jugador.setState(states.CAMINAR_IZQ);
        else if (input === "PRESS down") this.jugador.setState(states.AGACHADO_DER);
        else if (input === "RELEASE right") this.jugador.setState(states.PARADO_DER);
        else if (input === "PRESS up") {
            this.jugador.saltando = true;
            this.jugador.setState(states.SALTAR_DER);
        }
    }

    exit() {
        if (!this.jugador.saltando) {
            this.jugador.velocidad = 0;
        }
    }
}

export class SaltarIzq extends State {
    constructor(jugador) {
        super('SALTAR IZQ');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("saltarIzquierda");
        this.jugador.velocidadSalto = this.jugador.maxVelocidadSalto; // Ajusta la velocidad de salto
        this.jugador.velocidad *= 0.8; // Reduce la velocidad horizontal al saltar
        this.jugador.maxFrames = 6;
    }

    handleInput(input) {
        if (this.jugador.velocidadSalto > 0) {
            this.jugador.setState(states.CAER_IZQ);
        }
    }
}
export class SaltarDer extends State {
    constructor(jugador) {
        super('SALTAR DER');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("saltarDerecha");
        this.jugador.velocidadSalto = this.jugador.maxVelocidadSalto; // Ajusta la velocidad de salto
        this.jugador.velocidad *= 0.8; // Reduce la velocidad horizontal al saltar
        this.jugador.maxFrames = 6;
    }

    handleInput(input) {
        if (this.jugador.velocidadSalto > 0) {
            this.jugador.setState(states.CAER_DER);
        }
    }
}

export class CaerIzq extends State {
    constructor(jugador) {
        super('CAER IZQ');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("caerIzquierda");
        this.jugador.maxFrames = 3; // Número máximo de frames en la animación    
        this.jugador.saltando = false; // Asegurarse de que no está saltando al entrar en este estado    
    }

    handleInput(input) {
        if (this.jugador.enSuelo()) {
            this.jugador.setState(states.PARADO_IZQ);
        }
    }
}

export class CaerDer extends State {
    constructor(jugador) {
        super('CAER DER');
        this.jugador = jugador;
    }

    enter() {
        this.jugador.spriteSheet = document.getElementById("caerDerecha");
        this.jugador.maxFrames = 3; // Número máximo de frames en la animación
        this.jugador.saltando = false; // Asegurarse de que no está saltando al entrar en este estado
    }

    handleInput(input) {
        if (this.jugador.enSuelo()) {
            this.jugador.setState(states.PARADO_DER);
        }
    }
}