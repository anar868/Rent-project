import functools
import math

from rentApp1.models import Comment


def sum(array):
    return functools.reduce(lambda x, y: x + y, array)


def reverse_range(K):
    result = []
    for i in range(K):
        result.append("")
    for i in range(K):
        result[i] = K - i
    return result


def f(s, ns):
    N = sum(ns)
    K = len(ns)
    total = 0
    for i in range(K):
        total += s[i]*(ns[i]+1)
    return total / (N + K)


def starsort(comment_ad_comments):
    ns = get_countOfRates(comment_ad_comments)
    N = sum(ns)
    K = len(ns)
    s = reverse_range(K)
    s2 = list(map(lambda x: x*x, s))
    z = 1.65
    fsns = f(s, ns)
    fs2ns = f(s2, ns)
    rate = fsns - z*math.sqrt(
        (f(s2, ns) - fsns*fsns)/(N+K+1)
    )
    rounded_rate = round(rate, 1)
    return rounded_rate

def get_countOfRates(comment_ad_comments):
    countOfRate1 = 0
    countOfRate2 = 0
    countOfRate3 = 0
    countOfRate4 = 0
    countOfRate5 = 0
    for i in comment_ad_comments:
        i_rating = int(i.rating)
        if i_rating == 1:
            countOfRate1 += 1
        if i_rating == 2:
            countOfRate2 += 1
        if i_rating == 3:
            countOfRate3 += 1
        if i_rating == 4:
            countOfRate4 += 1
        if i_rating == 5:
            countOfRate5 += 1
    ratesList = [countOfRate5, countOfRate4, countOfRate3, countOfRate2, countOfRate1]
    return ratesList

