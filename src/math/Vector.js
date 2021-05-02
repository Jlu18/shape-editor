class Vector4 {
    constructor(x=0,y=0,z=0,w=1){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.vector = true;
    }
    toArray(){
        return [this.x,this.y,this.z,this.w];
    }
    clone(){
        return new Vector4().copy(this);
    }
    setAll(x,y,z,w){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }
    set(n,v){
        switch(n){
            case "x":
                this.x = v;
                break;
            case "y":
                this.y = v;
                break;
            case "z":
                this.z = v;
                break;
            case "w":
                this.w = v;
                break;
            default:
                console.error("Vector4 set() Error: Unkown type: " + n);
        }
    }
    copy(vec4){
        this.x = vec4.x;
        this.y = vec4.y;
        this.z = vec4.z;
        this.w = vec4.w;
        

        return this;
    }
    multiplyMatrix4(m){
        const x = this.x, y = this.y, z = this.z, w = this.w;

        this.x = ( m[ 0 ] * x + m[ 4 ] * y + m[  8 ] * z + m[ 12 ] ) * w;
        this.y = ( m[ 1 ] * x + m[ 5 ] * y + m[  9 ] * z + m[ 13 ] ) * w;
        this.z = ( m[ 2 ] * x + m[ 6 ] * y + m[ 10 ] * z + m[ 14 ] ) * w;
        this.w = ( m[ 3 ] * x + m[ 7 ] * y + m[ 11 ] * z + m[ 15 ] ) * w;
    }
}

class Vector3 {
    constructor(x=0,y=0,z=0){
        this.x = x;
        this.y = y;
        this.z = z;
        this.vector = true;
    }
    toArray(){
        return [this.x,this.y,this.z];
    }
    clone(){
        return new Vector3().copy(this);
    }
    setAll(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }
    set(n,v){
        switch(n){
            case "x":
                this.x = v;
                break;
            case "y":
                this.y = v;
                break;
            case "z":
                this.z = v;
                break;
            default:
                console.error("Vector4 set() Error: Unkown type: " + n);
        }
    }
    copy(vec3){
        this.x = vec3.x;
        this.y = vec3.y;
        this.z = vec3.z;

        return this;
    }
    multiplyMatrix4(m){
        const x = this.x, y = this.y, z = this.z;
        const w = 1 / ( m[ 3 ] * x + m[ 7 ] * y + m[ 11 ] * z + m[ 15 ] );

        this.x = ( m[ 0 ] * x + m[ 4 ] * y + m[  8 ] * z + m[ 12 ] ) * w;
        this.y = ( m[ 1 ] * x + m[ 5 ] * y + m[  9 ] * z + m[ 13 ] ) * w;
        this.z = ( m[ 2 ] * x + m[ 6 ] * y + m[ 10 ] * z + m[ 14 ] ) * w;

        return this;
    }
}