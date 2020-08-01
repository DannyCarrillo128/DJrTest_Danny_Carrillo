# encoding: utf-8
# Sala de chat

def salaDeChat(s):

    if s.find('H') != -1:
        i1 = s.find('H')
    else: i1 = s.find('h')

    if s.find('O') != -1:
        i2 = s.find('O')
    else: i2 = s.find('o')

    if s.find('L') != -1:
        i3 = s.find('L')
    else: i3 = s.find('l')

    if s.find('A') != -1:
        i4 = s.find('A')
    else: i4 = s.find('a')

    if (i1 < i2) and (i2 < i3) and (i3 < i4):
        return True
    else: return False


print salaDeChat('HoLa')
print salaDeChat('hhhhooooollllllaaaaaa')
print salaDeChat('hhhlllllloooollllla')