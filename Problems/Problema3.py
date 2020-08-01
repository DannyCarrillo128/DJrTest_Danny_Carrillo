# encoding: utf-8
# Todo en todo

def subcadena(s, t):

    lista = list(s)
    
    for i in range(len(s)):
        if t.find(lista[i]) == -1:
            return "No"
    
    return "Yes"

print subcadena('sequence', 'subsequence')
print subcadena('person', 'compression')
print subcadena('VERDI', 'vivaVittorioEmanueleReDiItalia')
print subcadena('caseDoesMatter', 'CaseDoesMatter')